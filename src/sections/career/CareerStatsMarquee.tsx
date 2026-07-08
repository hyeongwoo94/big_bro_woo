import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { CAREER_STATS } from "./statsData";

/** loop 조건: 슬라이드 1개 = stats 3개 묶음, 충분히 복제 */
const MARQUEE_GROUP_COUNT = 24;

const MARQUEE_SPEED_MS = 10000;
const MARQUEE_SPACE_BETWEEN = 48;

function StatGroup({
    idPrefix,
    groupIndex,
}: {
    idPrefix: string;
    groupIndex: number;
}) {
    return (
        <div className="career-sec_marquee-group">
            {CAREER_STATS.map((stat) => (
                <span
                    key={`${idPrefix}-${groupIndex}-${stat.label}`}
                    className="career-sec_stat"
                >
                    <strong className="career-sec_stat-value">
                        {stat.value}
                    </strong>
                    <span className="career-sec_stat-label">{stat.label}</span>
                </span>
            ))}
        </div>
    );
}

function rebuildLoop(swiper: SwiperInstance) {
    const slidesInView = Math.max(Math.ceil(swiper.slidesPerViewDynamic()), 1);
    const minLoopSlides = slidesInView + swiper.params.slidesPerGroup!;

    if (swiper.slides.length < minLoopSlides) return;

    swiper.autoplay.stop();
    swiper.params.loopAdditionalSlides = minLoopSlides + 2;
    swiper.loopDestroy();
    swiper.loopCreate();
    swiper.update();
    swiper.loopFix();
}

function startAutoplay(swiper: SwiperInstance) {
    swiper.params.speed = MARQUEE_SPEED_MS;
    swiper.autoplay.start();
}

export default function CareerStatsMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperInstance | null>(null);
    const loopReadyRef = useRef(false);
    const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [canMountSwiper, setCanMountSwiper] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotion = () => setReduceMotion(mq.matches);
        updateMotion();
        mq.addEventListener("change", updateMotion);
        return () => mq.removeEventListener("change", updateMotion);
    }, []);

    useEffect(() => {
        if (reduceMotion) return;

        const el = containerRef.current;
        if (!el) return;

        const checkWidth = () => {
            setCanMountSwiper(el.clientWidth > 0);
        };

        checkWidth();
        const ro = new ResizeObserver(checkWidth);
        ro.observe(el);
        return () => ro.disconnect();
    }, [reduceMotion]);

    useEffect(() => {
        return () => {
            if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
        };
    }, []);

    const handleSwiperInit = (swiper: SwiperInstance) => {
        swiperRef.current = swiper;
        rebuildLoop(swiper);
        loopReadyRef.current = true;

        // loop 정렬 직후 autoplay 시작 (초기 burst 방지)
        requestAnimationFrame(() => {
            startAutoplay(swiper);
        });
    };

    const handleSwiperResize = (swiper: SwiperInstance) => {
        if (!loopReadyRef.current) return;

        if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
        resizeTimerRef.current = setTimeout(() => {
            swiper.autoplay.stop();
            swiper.loopFix();
            swiper.update();
            startAutoplay(swiper);
        }, 150);
    };

    if (reduceMotion) {
        return (
            <div
                className="career-sec_marquee career-sec_marquee--static"
                aria-label="경력 하이라이트"
            >
                <div className="career-sec_marquee-static">
                    <StatGroup idPrefix="static" groupIndex={0} />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="career-sec_marquee"
            aria-label="경력 하이라이트"
        >
            {canMountSwiper && (
                <Swiper
                    className="career-sec_marquee-swiper"
                    modules={[Autoplay]}
                    observer
                    observeParents
                    watchSlidesProgress
                    onInit={handleSwiperInit}
                    onResize={handleSwiperResize}
                    slidesPerView="auto"
                    slidesPerGroup={1}
                    spaceBetween={MARQUEE_SPACE_BETWEEN}
                    loop
                    loopAddBlankSlides
                    speed={MARQUEE_SPEED_MS}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        reverseDirection: true,
                        waitForTransition: true,
                        enabled: false,
                    }}
                >
                    {Array.from(
                        { length: MARQUEE_GROUP_COUNT },
                        (_, groupIndex) => (
                            <SwiperSlide
                                key={groupIndex}
                                className="career-sec_marquee-slide"
                            >
                                <StatGroup
                                    idPrefix="group"
                                    groupIndex={groupIndex}
                                />
                            </SwiperSlide>
                        ),
                    )}
                </Swiper>
            )}
        </div>
    );
}
