import type { Meta, StoryObj } from "@storybook/react";
import "../sections/styles/MatchCompany.css";

/**
 * MatchCompany 섹션에서 쓰는 O/X(예/아니오) 버튼 스타일.
 * .match-company-sec ._btn._btn--yes(긍정), ._btn--no(부정) 클래스 조합.
 */
function ButtonOXPreview() {
  return (
    <div className="match-company-sec" style={{ minHeight: "auto", padding: "var(--spacing-2xl)" }}>
      <div className="_cont" style={{ gap: "var(--spacing-xl)" }}>
        <p className="text-sm text-muted">MatchCompany에서 사용하는 답변 버튼 스타일</p>
        <div className="_buttons">
          <button type="button" className="_btn _btn--yes">
            예
          </button>
          <button type="button" className="_btn _btn--no">
            아니오
          </button>
        </div>
        <p className="text-xs text-muted">
          O(긍정): accent-warm 배경 / X(부정): 보더만, text-muted
        </p>
      </div>
    </div>
  );
}

const meta: Meta<typeof ButtonOXPreview> = {
  title: "Design System/Button (O-X Style)",
  component: ButtonOXPreview,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "MatchCompany 섹션의 답변 버튼 스타일. 긍정(O)은 --color-accent-warm, 부정(X)은 보더+text-muted. 스타일은 sections/styles/MatchCompany.css에서 정의됩니다.",
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ButtonOXPreview>;

export const Default: Story = {
  render: () => <ButtonOXPreview />,
};

export const CustomLabels: Story = {
  render: () => (
    <div className="match-company-sec" style={{ minHeight: "auto", padding: "var(--spacing-2xl)" }}>
      <div className="_cont" style={{ gap: "var(--spacing-md)" }}>
        <div className="_buttons">
          <button type="button" className="_btn _btn--yes">
            다음 보기
          </button>
          <button type="button" className="_btn _btn--no">
            확인
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "같은 스타일로 '다음 보기', '확인' 등 다른 라벨을 쓸 수 있습니다.",
      },
    },
  },
};
