'use client';

import { QRCodeCanvas } from 'qrcode.react';

type QRCodeProps = {
  value: string;
};

export default function QRCodeGenerator({ value }: QRCodeProps) {
  return (
    <QRCodeCanvas
      value={value}
      size={200}
      bgColor="#ffffff"
      fgColor="#000000"
      level="H"
      includeMargin
    />
  );
}
