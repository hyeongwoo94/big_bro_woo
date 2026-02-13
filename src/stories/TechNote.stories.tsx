import type { Meta, StoryObj } from "@storybook/react";
import { TechNoteProvider, TechNote } from "../shared/ui/TechNote";

const meta: Meta<typeof TechNote> = {
  title: "shared/TechNote",
  component: TechNote,
  decorators: [
    (Story) => (
      <TechNoteProvider>
        <Story />
      </TechNoteProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "섹션별 '기술 설명' 버튼 + 모달. 769px 이상에서만 표시. TechNoteProvider로 감싸야 합니다.",
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TechNote>;

const sampleContent = (
  <>
    <p>이 컴포넌트는 기술 설명 모달의 예시 내용입니다.</p>
    <h3>활용한 것들</h3>
    <ul>
      <li>
        <strong>Context API</strong>로 열린 모달 하나를 전역에서 관리합니다.
      </li>
      <li>
        <strong>template</strong>으로 tpl-a / tpl-b / tpl-c 스타일을 선택할 수 있습니다.
      </li>
    </ul>
    <p className="tech-note-muted">
      768px 이하에서는 버튼과 모달이 비표시됩니다.
    </p>
  </>
);

export const Default: Story = {
  args: {
    title: "기술설명 모달 예시",
    content: sampleContent,
    template: "a",
  },
};

export const WithLongTitle: Story = {
  args: {
    title: "MatchCompany 섹션 / 기술설명",
    content: sampleContent,
    template: "a",
  },
};
