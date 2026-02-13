import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toast from "../shared/ui/Toast";

const meta: Meta<typeof Toast> = {
  title: "shared/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: "마우스를 움직여 이름을 찾아보세요",
    duration: 5000,
    onClose: () => {},
  },
};

export const ShortMessage: Story = {
  args: {
    message: "저장되었습니다",
    duration: 2000,
    onClose: () => {},
  },
};

export const LongDuration: Story = {
  args: {
    message: "5초 후에 사라지는 토스트",
    duration: 5000,
    onClose: () => {},
  },
};

function ToastWithTrigger() {
  const [key, setKey] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <button
        type="button"
        onClick={() => {
          setShow(true);
          setKey((k) => k + 1);
        }}
        style={{
          padding: "var(--spacing-sm) var(--spacing-lg)",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        토스트 다시 보기
      </button>
      {show && (
        <Toast
          key={key}
          message="버튼을 누르면 토스트가 다시 나타납니다"
          duration={3000}
          onClose={() => setShow(false)}
        />
      )}
    </div>
  );
}

export const WithTrigger: Story = {
  render: () => <ToastWithTrigger />,
  parameters: {
    docs: {
      description: {
        story: "토스트는 duration 후 onClose가 호출됩니다. '다시 보기'로 재표시할 수 있습니다.",
      },
    },
  },
};
