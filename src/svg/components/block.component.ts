// TODO

// import { IElement } from "../types/element.inerface";
// import { h } from "../utils";

// interface IBlockOptions {
//   x: number;
//   y: number;
//   padding: number;
//   gap: number;
//   radios: number;
// }

// export default (
//   childs: IElement[],
//   options: IBlockOptions = { x: 0, y: 0, padding: 10, gap: 10, radios: 6 }
// ): IElement => {
//   const rect = childs.reduce(
//     (accum, child) => ({
//       w: accum.w > child.rect.w ? accum.w : child.rect.w,
//       h: accum.h > child.rect.h ? accum.h : child.rect.h,
//     }),
//     { w: 0, h: 0 }
//   );
//   return {
//     str: h(
//       "rect",
//       { width: `${rect.w}`, height: `${rect.h}`, rx: options.radios },
//       childs.map((child) => child.str)
//     ),
//     rect: { x: 0, y: 0, w: rect.w, h: rect.h },
//   };
// };
