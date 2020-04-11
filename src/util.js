const setTheme = (themeName) => {
  const currentCssVar = Array.from(document.styleSheets).reduce(
    (acc, sheet) =>
      (acc = [
        ...acc,
        ...Array.from(sheet.cssRules).reduce(
          (def, rule) =>
            (def =
              rule.selectorText === ":root"
                ? [
                    ...def,
                    ...Array.from(rule.style).filter((name) =>
                      name.startsWith("--current")
                    ),
                  ]
                : def),
          []
        ),
      ]),
    []
  );

  currentCssVar.forEach((item) => {
    document.documentElement.style.setProperty(
      item,
      `var(--${themeName}${item.substring(9)})`
    );
  });
};

export default setTheme;
