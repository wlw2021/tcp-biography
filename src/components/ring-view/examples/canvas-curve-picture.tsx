import { drawCurveImage, drawCurveImage_Deprecated } from './canvas-render';
import  React,{
  FC,
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
  FormEventHandler,
} from 'react';
import picURL from './xxy1.png'
import picU2 from './xxy2.png'


type StaticDrawingParams = [
  CanvasRenderingContext2D,
  Point2D,
  Point2D,
  Point2D,
  Point2D,
  HTMLImageElement
];

export const CurvePicture: FC = memo(() => {

  const xCount =50;
  const yCount=50;
  const angle = 180;
  
  const cvsRef = useRef<null | HTMLCanvasElement>(null);
  const cvsRefdown = useRef<null | HTMLCanvasElement>(null);
 
  const [staticParams, setStaticParams] = useState<null | StaticDrawingParams>(
    null
  );
  
 
  useEffect(() => {
    const ctx = (cvsRef.current as HTMLCanvasElement).getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    const ctxdown = (cvsRefdown.current as HTMLCanvasElement).getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    //ctx.scale(-1,-1)
    ctxdown.fillStyle='rgba(255,255,255,0)'
    ctxdown.fillRect(0,0,1320,1320)
    ctx.fillStyle='rgba(255,255,255,0)'
    ctx.fillRect(0,0,1320,1320)
    const imgd = new Image();
    imgd.src = picU2;
    imgd.onload = () => {
      const { width, height } = imgd;
      const imgWidth = 914;
      const imgHeight = (height * imgWidth) / width;
      imgd.width = imgWidth;
      imgd.height = imgHeight;
      const pa = { x: 203.1, y: 457.4 };
      const pb = { x: pa.x + imgWidth, y: pa.y };
      const pc = { x: pa.x + imgWidth, y: pa.y + imgHeight };
      const pd = { x: pa.x, y: pa.y + imgHeight };
      setStaticParams([ctxdown, pa, pb, pc, pd, imgd]);
    };

    const img = new Image();
    img.src = picURL;
    img.onload = () => {
      const { width, height } = img;
      console.log(width,height)
      const imgWidth = 914;
      const imgHeight = (height * imgWidth) / width;
      img.width = imgWidth;
      img.height = imgHeight;
      const pa = { x: 203.1, y: 457.4 };
      const pb = { x: pa.x + imgWidth, y: pa.y };
      const pc = { x: pa.x + imgWidth, y: pa.y + imgHeight };
      const pd = { x: pa.x, y: pa.y + imgHeight };
      setStaticParams([ctx, pa, pb, pc, pd, img]);
    };
  }, []);
  
  useEffect(() => {
    if (staticParams) {      
      const [ctx, pa, pb, pc, pd, img] = staticParams;
      requestAnimationFrame(() => {
        drawCurveImage(
          ctx,
          pa,
          pb,
          pc,
          pd,
          180,
          50,
          img,
          false,
          false,
          true,
          50
        );
      });
    }
  }, [staticParams, angle, xCount, yCount]);

  return (
    <>
    <div id='xiaban' style={{transform:'rotate(180deg)',height:1320,width:1320}}>
      <canvas width={1320} height={1320} ref={cvsRefdown} ></canvas>
    </div>
    <div id='shangban' style={{height:1320,width:1320,marginTop:-1320}}>
      <canvas  width={1320} height={1320} ref={cvsRef} ></canvas>     
    </div>
      <br />
    </>
  );
});
