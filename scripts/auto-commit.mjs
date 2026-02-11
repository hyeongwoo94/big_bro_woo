#!/usr/bin/env node

/**
 * 자동 커밋 스크립트
 * docs/history.md 변경 시 의미 있는 변화만 커밋·푸시
 * @see docs/auto-commit-design.md
 */

import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- 설정 ---
const DEFAULT_CONFIG = {
  targetFile: 'docs/history.md',
  mode: 'strict', // strict | relaxed | always
  commitPrefix: 'docs:',
  runPush: true,
  maxMessageLength: 50,
};

function loadConfig() {
  const configPath = join(__dirname, 'config.json');
  if (existsSync(configPath)) {
    try {
      const user = JSON.parse(readFileSync(configPath, 'utf-8'));
      return { ...DEFAULT_CONFIG, ...user };
    } catch (e) {
      console.warn('[auto-commit] config.json 파싱 실패, 기본값 사용:', e.message);
    }
  }
  return { ...DEFAULT_CONFIG };
}

// --- Git 유틸 ---
function runGit(args, options = {}) {
  const result = spawnSync('git', args, {
    encoding: 'utf-8',
    stdio: ['inherit', 'pipe', 'pipe'],
    ...options,
  });
  return { ...result, output: result.stdout + result.stderr };
}

function hasChanges() {
  const r = runGit(['status', '--short']);
  return r.stdout.trim().length > 0;
}

function getHistoryDiff(targetFile) {
  const r = runGit(['diff', 'HEAD', '--', targetFile]);
  return r.stdout;
}

// --- 의미성 검사 ---

/** 새 테이블 기록 행: | YYYY-MM-DD | ... | */
const DATE_ROW_PATTERN = /^\+\s*\|?\s*\d{4}-\d{2}-\d{2}\s*\|/;

/** 새 서브섹션: ### 3. */
const SUBSECTION_PATTERN = /^\+\s*###\s+3\.\d/;

function isSignificant(diffOutput, mode) {
  if (mode === 'always') return true;

  const lines = diffOutput.split('\n').filter((line) => line.startsWith('+') && !line.startsWith('+++'));
  if (lines.length === 0) return false;

  if (mode === 'relaxed') return lines.length >= 1;

  // strict: 패턴 매칭
  return lines.some((line) => DATE_ROW_PATTERN.test(line) || SUBSECTION_PATTERN.test(line));
}

// --- 커밋 메시지 생성 ---

/** 테이블 행에서 '내용' 컬럼 추출 (3번째 컬럼) */
function extractContentFromRow(line) {
  const match = line.match(/\|\s*[^|]+\|\s*[^|]+\|\s*([^|]+)\|/);
  return match ? match[1].trim() : null;
}

function generateCommitMessage(diffOutput, config) {
  const prefix = config.commitPrefix || 'docs:';
  const maxLen = config.maxMessageLength ?? 50;

  const lines = diffOutput.split('\n').filter((line) => line.startsWith('+') && !line.startsWith('+++'));
  for (const line of lines) {
    if (DATE_ROW_PATTERN.test(line)) {
      const content = extractContentFromRow(line.replace(/^\+\s*/, ''));
      if (content && content.length > 0 && !content.startsWith('---')) {
        const msg = `${prefix} ${content}`.slice(0, maxLen);
        if (msg.length > 0) return msg;
      }
    }
  }

  if (SUBSECTION_PATTERN.test(diffOutput)) {
    const msg = `${prefix} history 업데이트 (새 섹션)`.slice(0, maxLen);
    return msg;
  }

  return `${prefix} history 업데이트`.slice(0, maxLen);
}

// --- 메인 ---
function main() {
  const config = loadConfig();
  const targetFile = config.targetFile;
  const mode = config.mode;

  const rootDir = runGit(['rev-parse', '--show-toplevel']).stdout?.trim();
  if (!rootDir) {
    console.error('[auto-commit] Git 저장소가 아닙니다.');
    process.exit(1);
  }

  process.chdir(rootDir);

  if (!hasChanges()) {
    console.log('[auto-commit] 변경 사항 없음. 스킵.');
    return;
  }

  let diffOutput = '';
  try {
    diffOutput = getHistoryDiff(targetFile);
  } catch (e) {
    console.warn('[auto-commit] diff 조회 실패:', e.message);
  }

  if (mode !== 'always' && !existsSync(targetFile)) {
    console.log('[auto-commit] targetFile 없음, 스킵.');
    return;
  }

  if (mode !== 'always' && !isSignificant(diffOutput, mode)) {
    if (!diffOutput.trim()) {
      console.log('[auto-commit] history.md 변경 없음. 스킵.');
    } else {
      console.log('[auto-commit] 의미성 검사: 오타/소규모 수정으로 판단. 스킵.');
    }
    return;
  }

  const message = generateCommitMessage(diffOutput, config);

  console.log('[auto-commit] git add .');
  let r = runGit(['add', '.']);
  if (r.status !== 0) {
    console.error('[auto-commit] git add 실패:', r.output);
    process.exit(1);
  }

  console.log('[auto-commit] git commit -m', JSON.stringify(message));
  r = runGit(['commit', '-m', message]);
  if (r.status !== 0) {
    if (r.stdout?.includes('nothing to commit') || r.stderr?.includes('nothing to commit')) {
      console.log('[auto-commit] 커밋할 변경 없음 (이미 스테이징됨). 스킵.');
    } else {
      console.error('[auto-commit] git commit 실패:', r.output);
      process.exit(1);
    }
    return;
  }

  if (config.runPush) {
    console.log('[auto-commit] git push');
    r = runGit(['push']);
    if (r.status !== 0) {
      console.error('[auto-commit] git push 실패. 수동 해결 후 푸시하세요:', r.output);
      process.exit(1);
    }
  }

  console.log('[auto-commit] 완료.');
}

main();
