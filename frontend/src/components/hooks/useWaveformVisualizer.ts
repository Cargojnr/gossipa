// hooks/useWaveformVisualizer.ts
import { useEffect, useRef } from "react";

export function useWaveformVisualizer(stream: MediaStream | null, isRecording: boolean) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!stream || !isRecording || !canvasRef.current) return;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);

    analyser.fftSize = 2048;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#7f5af0";
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current!);
      audioCtx.close();
    };
  }, [stream, isRecording]);

  return canvasRef;
}
