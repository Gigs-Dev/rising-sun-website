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
  export type { UIProps, SpanTypes };
  