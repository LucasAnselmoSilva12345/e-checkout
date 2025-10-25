type PaymentInfoProps = {
  paymentMethod: 'card' | 'pix' | null;
  cardData?: {
    number: string;
    name: string;
    cpf: string;
    expiry: string;
    installments: number;
  } | null;
};

export function PaymentInfo({ paymentMethod, cardData }: PaymentInfoProps) {
  return (
    <div className="text-neutral-950 font-medium text-sm">
      <h3 className=" font-semibold text-base">Informações de pagamento</h3>

      <div>
        <p className="text-neutral-800 font-normal">
          <strong>Método:</strong>{' '}
          {paymentMethod === 'card' ? 'Cartão de Crédito' : 'PIX'}
        </p>
        {paymentMethod === 'card' && cardData && (
          <>
            <p className="text-neutral-800 font-normal">
              <span className="font-bold">Número final do Cartão:</span>{' '}
              {cardData.number.slice(-4)}
            </p>
            <p className="text-neutral-800 font-normal">
              <span className="font-bold">Nome no cartão:</span> {cardData.name}
            </p>
            <p className="text-neutral-800 font-normal">
              <span className="font-bold">CPF:</span> {cardData.cpf}
            </p>
            <p className="text-neutral-800 font-normal">
              <span className="font-bold">Parcelado em:</span>{' '}
              {cardData.installments}x
            </p>
          </>
        )}

        {paymentMethod === 'pix' && (
          <p className="text-green-700 font-medium">
            Pagamento via PIX — confirmado ✅
          </p>
        )}
      </div>
    </div>
  );
}
