import gsap from "gsap";

const DANGER_PROPS = new Set([
  "width", "height", "top", "left", "right", "bottom",
  "margin", "padding", "fontSize", "lineHeight",
  "backgroundColor", "color", "borderRadius", "boxShadow",
]);

if (process.env.NODE_ENV === "development") {
  gsap.config({ nullTargetWarn: true });

  // Monkey-patch gsap.to in dev to warn on layout-thrashing properties
  const originalTo = gsap.to.bind(gsap);
  (gsap as any).to = (targets: any, vars: any) => {
    Object.keys(vars).forEach((key) => {
      if (DANGER_PROPS.has(key)) {
        console.warn(
          `[PERF WARNING] GSAP animating "${key}" causes layout reflow. ` +
          `Prefer transform equivalents: x/y/scale/rotation/opacity.`
        );
      }
    });
    return originalTo(targets, vars);
  };
}
