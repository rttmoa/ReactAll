import { useEffect } from 'react';
import { isEmpty } from 'project-libs';



/**
 * TODO: 图片进入页面可视区 再加载图片
 * 1，监听图片是否进入可视区域；
 * 2，将src属性的值替换为真实的图片地址，data-src
 * 3，停止监听当前的节点
 * @param {*} ele
 * @param {*} callback
 * @param {*} watch
 */
let observer;
export default function useImgHook(ele, callback, watch = []){
  useEffect(()=>{
    const nodes = document.querySelectorAll(ele);
    // console.log(nodes) // NodeList(8) [img.item-img, img.item-img, img.item-img, img.item-img, img.item-img, img.item-img, img.item-img, img.item-img]
    if(!isEmpty(nodes)){
      observer = new IntersectionObserver((entries)=>{
        callback && callback(entries);
        entries.forEach(item => {
          // console.log(item) // IntersectionObserverEntry {time: 1474.6000000014901, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: false, …}
          if(item.isIntersecting){
            const dataSrc = item.target.getAttribute('data-src');
            // console.log(dataSrc) // /static/2.8b3219d7.png
            item.target.setAttribute('src', dataSrc);
            observer.unobserve(item.target);
          }
        });
      });
      // console.log(observer) // IntersectionObserver {root: null, rootMargin: '0px 0px 0px 0px', thresholds: Array(1), delay: 0, trackVisibility: false}
      nodes.forEach(item => {
        // console.log(item) // DOM:  <img alt="img" class="item-img" src="/static/2.8b3219d7.png" data-src="/static/2.8b3219d7.png">
        observer.observe(item);
      });
    }

    return () => {
      if(!isEmpty(nodes) && observer){
        observer.disconnect();
      }
    }
  }, watch)
}
