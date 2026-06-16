import type { Meta, StoryObj } from "@storybook/react";
import Career from "../sections/Career";
import { CAREER_DATA } from "../shared/content/careerData";

const meta: Meta<typeof Career> = {
  title: "sections/Career",
  component: Career,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
경력/성장 히스토리를 보여주는 섹션.

- **PC**: 좌측 꺾은선 그래프 + 우측 히스토리 (스크롤에 따라 fade in/out)
- **Mobile**: 히스토리만 표시 (스크롤 연동)
- **인터랙션**: GSAP ScrollTrigger로 Sticky 스크롤 + 선 애니메이션

⚠️ Storybook에서는 ScrollTrigger가 제한적으로 동작합니다. 실제 동작은 브라우저에서 확인하세요.
        `,
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Career>;

export const Default: Story = {
  render: () => (
    <div style={{ height: "400vh" }}>
      <div style={{ height: "50vh", background: "var(--color-bg-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-text-muted)" }}>↓ 스크롤하면 Career 섹션 시작</p>
      </div>
      <Career />
      <div style={{ height: "50vh", background: "var(--color-bg-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Career 섹션 끝</p>
      </div>
    </div>
  ),
};

export const DataPreview: Story = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--color-bg)", color: "var(--color-text)" }}>
      <h2 style={{ marginBottom: "1rem" }}>Career 데이터 미리보기</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>Year</th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>Level</th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>Title</th>
            <th style={{ padding: "0.5rem", textAlign: "left" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {CAREER_DATA.map((item) => (
            <tr key={item.year} style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.5rem" }}>{item.year}</td>
              <td style={{ padding: "0.5rem" }}>{item.level}</td>
              <td style={{ padding: "0.5rem" }}>{item.title}</td>
              <td style={{ padding: "0.5rem", color: "var(--color-text-muted)" }}>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Career 섹션에서 사용하는 경력 데이터 목록입니다.",
      },
    },
  },
};
