'use client';

import QRCode from 'qrcode';
import Image from 'next/image';
import { generatePayloadPIX } from '@/lib/pixPayload';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from '@geist-ui/icons';

type PIXQRCodeProps = {
  value: number;
};

export default function PIXQRCode({ value }: PIXQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [pixPayload, setPixPayload] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateQRCode = async () => {
      const payload = generatePayloadPIX({
        pixKey: 'lucasanselmodasilva02@gmail.com',
        nome: 'Lucas Anselmo',
        cidade: 'SALTO',
        valor: value,
        mensagem: 'Pedido feito via site',
      });

      const url = await QRCode.toDataURL(payload);
      setQrCodeUrl(url);
      setPixPayload(payload);
    };
    generateQRCode();
  }, [value]);

  const handleCopy = async () => {
    if (!pixPayload) return;

    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar chave PIX:', err);
    }
  };

  return (
    <>
      {qrCodeUrl ? (
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center justify-center">
            <Image src={qrCodeUrl} alt="QR Code PIX" width={200} height={200} />
            <p className="text-sm text-neutral-600">
              Valor do PIX:{' '}
              <span className="text-green-600 font-semibold">
                R$ {value.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-center text-sm text-neutral-600">
              Você também pode pagar escolhendo a opção Pix Copia e Cola no seu
              aplicativo de pagamento ou Internet Banking (banco online). Neste
              caso, copie o código clicando no botão abaixo:
            </p>

            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex items-center gap-2 mx-auto"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copiado!' : 'Copiar código PIX'}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Gerando QR Code PIX...</p>
      )}
    </>
  );
}
