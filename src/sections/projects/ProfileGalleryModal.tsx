import { useCallback, useEffect, useState } from "react";
import type { ProfileGalleryItem } from "./profileGalleryData";

type ProfileGalleryModalProps = {
    images: ProfileGalleryItem[];
    isOpen: boolean;
    onClose: () => void;
};

export default function ProfileGalleryModal({
    images,
    isOpen,
    onClose,
}: ProfileGalleryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = images.length;
    const hasMultiple = total > 1;
    const current = images[currentIndex];

    const goTo = useCallback(
        (index: number) => {
            if (total === 0) return;
            setCurrentIndex((index + total) % total);
        },
        [total],
    );

    const goPrev = () => goTo(currentIndex - 1);
    const goNext = () => goTo(currentIndex + 1);

    useEffect(() => {
        if (!isOpen) return;
        setCurrentIndex(0);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (total <= 1) return;
            if (e.key === "ArrowLeft") {
                setCurrentIndex((i) => (i - 1 + total) % total);
            }
            if (e.key === "ArrowRight") {
                setCurrentIndex((i) => (i + 1) % total);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose, total]);

    if (!isOpen || !current) return null;

    return (
        <>
            <button
                type="button"
                className="projects-sec_modal-overlay projects-sec_modal-overlay--open"
                aria-label="갤러리 닫기"
                onClick={onClose}
            />
            <div
                className="projects-sec_gallery-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="profile-gallery-title"
            >
                <div className="projects-sec_gallery-header">
                    <h3
                        id="profile-gallery-title"
                        className="projects-sec_gallery-title"
                    >
                        박형우
                    </h3>
                    <button
                        type="button"
                        className="projects-sec_modal-close"
                        aria-label="닫기"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="projects-sec_gallery-body">
                    <div className="projects-sec_gallery-slide-wrap">
                        {hasMultiple && (
                            <button
                                type="button"
                                className="projects-sec_gallery-nav projects-sec_gallery-nav--prev"
                                aria-label="이전 사진"
                                onClick={goPrev}
                            >
                                ‹
                            </button>
                        )}

                        <div className="projects-sec_gallery-slide">
                            <img
                                src={current.src}
                                alt={current.alt}
                                className="projects-sec_gallery-image"
                            />
                        </div>

                        {hasMultiple && (
                            <button
                                type="button"
                                className="projects-sec_gallery-nav projects-sec_gallery-nav--next"
                                aria-label="다음 사진"
                                onClick={goNext}
                            >
                                ›
                            </button>
                        )}
                    </div>

                    {hasMultiple && (
                        <div
                            className="projects-sec_gallery-dots"
                            role="tablist"
                            aria-label="사진 선택"
                        >
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    type="button"
                                    role="tab"
                                    className="projects-sec_gallery-dot"
                                    data-active={index === currentIndex}
                                    aria-label={`${index + 1}번째 사진`}
                                    aria-selected={index === currentIndex}
                                    onClick={() => goTo(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
