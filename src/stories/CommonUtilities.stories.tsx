import type { Meta, StoryObj } from "@storybook/react";

/**
 * common.css에 정의된 공통 유틸리티 클래스 미리보기.
 * 디자인 토큰 기반이므로 라이트/다크 테마에 따라 자동 대응됩니다.
 */
function CommonUtilitiesPreview() {
  return (
    <div style={{ padding: "var(--spacing-xl)", maxWidth: 720 }}>
      <h1 className="text-xl font-semibold text-default" style={{ marginBottom: "var(--spacing-lg)" }}>
        공통 유틸리티 클래스 (common.css)
      </h1>

      <section style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2 className="text-lg font-medium text-default" style={{ marginBottom: "var(--spacing-md)" }}>
          글씨 크기
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-md)", alignItems: "baseline" }}>
          <span className="text-xs">.text-xs</span>
          <span className="text-sm">.text-sm</span>
          <span className="text-base">.text-base</span>
          <span className="text-lg">.text-lg</span>
          <span className="text-xl">.text-xl</span>
          <span className="text-2xl">.text-2xl</span>
        </div>
      </section>

      <section style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2 className="text-lg font-medium text-default" style={{ marginBottom: "var(--spacing-md)" }}>
          글씨 굵기
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-md)" }}>
          <span className="text-base font-normal">.font-normal</span>
          <span className="text-base font-medium">.font-medium</span>
          <span className="text-base font-semibold">.font-semibold</span>
          <span className="text-base font-bold">.font-bold</span>
        </div>
      </section>

      <section style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2 className="text-lg font-medium text-default" style={{ marginBottom: "var(--spacing-md)" }}>
          글씨 색
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-md)" }}>
          <span className="text-default">.text-default</span>
          <span className="text-muted">.text-muted</span>
          <span className="text-accent">.text-accent</span>
          <span className="text-accent-warm">.text-accent-warm</span>
        </div>
      </section>

      <section style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2 className="text-lg font-medium text-default" style={{ marginBottom: "var(--spacing-md)" }}>
          보더
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-md)" }}>
          <div className="border rounded-md" style={{ padding: "var(--spacing-sm)" }}>.border</div>
          <div className="border-thick rounded-md" style={{ padding: "var(--spacing-sm)" }}>.border-thick</div>
          <div className="border-thick border-accent rounded-md" style={{ padding: "var(--spacing-sm)" }}>.border-accent</div>
          <div className="border-thick border-accent-warm rounded-md" style={{ padding: "var(--spacing-sm)" }}>.border-accent-warm</div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2 className="text-lg font-medium text-default" style={{ marginBottom: "var(--spacing-md)" }}>
          모서리
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-md)", alignItems: "center" }}>
          <div className="border rounded-sm bg-surface" style={{ width: 48, height: 48 }}>.rounded-sm</div>
          <div className="border rounded-md bg-surface" style={{ width: 48, height: 48 }}>.rounded-md</div>
          <div className="border rounded-lg bg-surface" style={{ width: 48, height: 48 }}>.rounded-lg</div>
          <div className="border rounded-full bg-surface" style={{ width: 48, height: 48 }}>.rounded-full</div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2 className="text-lg font-medium text-default" style={{ marginBottom: "var(--spacing-md)" }}>
          배경
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-md)" }}>
          <div className="bg-default border rounded-lg" style={{ width: 80, height: 40 }}>.bg-default</div>
          <div className="bg-surface border rounded-lg" style={{ width: 80, height: 40 }}>.bg-surface</div>
          <div className="bg-transparent border rounded-lg" style={{ width: 80, height: 40 }}>.bg-transparent</div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2 className="text-lg font-medium text-default" style={{ marginBottom: "var(--spacing-md)" }}>
          줄 높이
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
          <p className="leading-tight text-sm">.leading-tight — 한 줄에 가깝게</p>
          <p className="leading-normal text-sm">.leading-normal — 기본 줄 높이</p>
          <p className="leading-relaxed text-sm">.leading-relaxed — 여유 있는 줄 높이</p>
        </div>
      </section>
    </div>
  );
}

const meta: Meta<typeof CommonUtilitiesPreview> = {
  title: "Design System/Common Utilities",
  component: CommonUtilitiesPreview,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "src/shared/styles/common.css에 정의된 유틸리티 클래스입니다. 디자인 토큰을 사용하므로 라이트/다크 모드에 자동 대응됩니다.",
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CommonUtilitiesPreview>;

export const All: Story = {
  render: () => <CommonUtilitiesPreview />,
};
