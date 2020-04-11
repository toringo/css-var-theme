## 启动

1. git clone git@github.com:toringo/css-var-theme.git
2. yarn i && yarn start

## 正文
### 利用CSS变量进行黑暗模式切换

> 本文以`react`为例。



用`css变量`来切换黑暗模式，易于维护和扩展。

`css变量`的用法：

```css
.selector {
  --black-color: #282c34;
}

:root {
  --black-color: #282c34;
}
```

#### 方案一

设置主题对应的CSS变量，切换主题只需切换css属性的变量值。例如：切换APP元素的主题只需切换App的`color`和`background-color`对应CSS变量的变量值即可。

```css
:root {
  /* 模式切换变量，默认light模式 */
  --current-background-color: var(--light-background-color);
  --current-primary-color: var(--light-primary-color);

  /* 浅色主题 */
  --light-primary-color: #666;
  --light-background-color: #fff;

  /* 深色主题 */
  --dark-primary-color: #fff;
  --dark-background-color: #282c34;
}

.App {
  color: var(--current-primary-color);
  background-color: var(--current-background-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  transition: background-color 0.3s;
}
```

那么如何切换`:root `下`--current-background-color`的值？

```reStructuredText
1. 查找它
2. 替换它
```

- 查它

```javascript
// 找到:root下所有定义以--current变量
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
```

- 换它

```javascript
currentCssVar.forEach((item) => {
  document.documentElement.style.setProperty(
    item,
    `var(--${themeName}${item.substring(9)})`
  );
});
```

完整JS代码：

```react
import React, { useEffect, useState } from "react";
import Project from "@bit/toringo.comp.product-list";
import Switch from "@bit/campgladiator.cgui.components.atoms.switch";

import "./App.css";
import setTheme from "./util";

// 默认主题可来源与server、storage等。
const defaultTheme = 'light';

function App() {
  const [mode, setMode] = useState(defaultTheme);

  useEffect(() => {
    setTheme(mode);
  }, [mode]);

  return (
    <div className="App">
      <Switch
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      />
      <Project list={["Hulk", "Stack", "Link"]} />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;

```



#### 方案二

设置CSS变量，定义theme对应的CSS class选择器，动态去改变className已达到主题切换。

```css
.App {
  /* color: var(--current-primary-color);
  background-color: var(--current-background-color); */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  transition: background-color 0.3s;
}

.App-light {
  color: var(--light-primary-color);
  background-color: var(--light-background-color);
}

.App-dark {
  color: var(--dark-primary-color);
  background-color: var(--dark-background-color);
}
```

JS代码：

```react
...
<div className={`App ${mode === "dark" ? "App-dark" : "App-light"}`}>
....  
```

以上[Demo体验](https://css-var-theme.lap.360.cn/)



#### 方案三 利用css媒体查询动态改变网页主题样式

当浏览器的主体发生变化时， 媒体查询的`prefers-color-scheme`会动态执行匹配的规则,

```css

@media (prefers-color-scheme: dark) {
  :root {
    /* 浅色主题 */
    --current-background-color: #282c34;
    --current-primary-color: #fff;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    /* 深色主题 */
    --current-background-color: #fff;
    --current-primary-color: #282c34;
  }
}

.App {
  color: var(--current-primary-color);
  background-color: var(--current-background-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  transition: background-color 0.3s;
}
```



#### 方案四 利用JS事件监听媒体查询动态 改变网页主题样式

[Web Animation API]([https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API#%E6%B5%8F%E8%A7%88%E5%99%A8%E6%94%AF%E6%8C%81](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API#浏览器支持))还提供给了监听css媒体查询条件的匹配。

```javascript
useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  const setFn = () => {
    setMode(mediaQuery.matches ? "light" : "dark");
  };

  mediaQuery.addEventListener("change", setFn);

  return () => {
    mediaQuery.removeListener("change", setFn);
  };
}, []);
```



> 欢迎留言讨论其他方案。

🍺🍺🍺



**参考文章**

[给网站添加暗黑模式指南-淘系前端团队](https://mp.weixin.qq.com/s/qfeCcJuJ7eHw-34yCqaSTg)


