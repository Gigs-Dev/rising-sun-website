interface UIProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}


interface SpanTypes {
  text: string;
  className: string;
}


interface CurvedTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  curveHeight?: number;
  totalWidth?: number;
  yNumber?: number; 
}
export type { UIProps, SpanTypes, CurvedTextProps };
