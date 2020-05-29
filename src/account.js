//原生js实现轮播图
var slideShow = document.getElementById('slideshow')
var imgList = document.getElementById('imglist')
var imgs = imgList.children
var duration = 3000 // 设置轮播时间间隔
var Index = 0
var count = imglist.children.length // 获取图片数量
var timer // 设置一个计时器
window.onload = function () {
  imgList.children[0].classList.add('appear') // 初始时显示第一幅图片
  //启动动画自动播放
  timer = setInterval(rotate, duration)
  // 鼠标移到图片上面时，停止动画
  slideShow.onmouseover = function (event) {
    clearInterval(timer)
  }
  // 鼠标离开图片上面时，启动动画
  slideShow.onmouseout = function (event) {
    timer = setInterval(rotate, duration)
  }
}
//改变图片和点的当前状态（通过 添加 或 移除 appear 属性）
function change() {
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].classList.remove('appear')
  }

  imgs[Index].classList.add('appear')
}
//循环切换图片
function rotate() {
  Index++
  if (Index == count) {
    Index = 0
  }
  change()
}
//切换上一幅图片
function preImg() {
  Index--
  if (Index < 0) {
    Index = count - 1
  }
  change()
}
//切换下一幅图片
function nextImg() {
  Index++
  if (Index == count) {
    Index = 0
  }
  change()
}
//单击某个圆点，切换到相应图片
function changeMe() {
  Index = this.index
  change()
}
//接口调用
