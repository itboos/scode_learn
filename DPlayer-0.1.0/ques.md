1. webkit 默认的控制条是如何隐藏的？
  通过开启虚拟Dom， 看到控制条设置了内敛的样式:
    display: none;
    opacity: 0;
  是在哪里设置的呢？
  https://lucumt.info/post/show-video-in-html5-page/



  知识点:
  1. 元素的全屏: fullscreenElement
  https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/fullscreenElement
  Fullscreen API：全屏操作
  https://javascript.ruanyifeng.com/htmlapi/fullscreen.html

  2. 媒体元素的一些监听事件: seeked
  https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
  监听切换视频/音频 播放的时间

  3. 检测Dom元素是否有某个类， 添加某个类:
  domEle.classList.add('dplayer-setting-box-narrow'); // 添加某个类
  domEle.classList.remove('dplayer-setting-box-narrow'); // 移除某个类
  domEle.classList.contains('dplayer-setting-box-open'); // 是否有某个类

  4. 获取dom元素上的数据 <p data-name='p元素'>
  pDom.dataset.speed