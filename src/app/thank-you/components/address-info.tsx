type AddressInfoProps = {
  shipping?: {
    address: string;
    city: string;
    state: string;
    zip: string;
    shippingInfo?: string;
  } | null;
};

export function AddressInfo({ shipping }: AddressInfoProps) {
  if (!shipping) return null;

  return (
    <div className="text-neutral-950 font-medium text-sm">
      <h3 className="font-semibold text-base">Endereço para entrega</h3>
      <p className="text-neutral-800 font-normal">
        <span className="font-bold">Endereço:</span> {shipping?.address},{' '}
        {shipping?.city} - {shipping?.state}
      </p>
      <p className="text-neutral-800 font-normal">
        <span className="font-bold">CEP:</span> {shipping?.zip}
      </p>
      <p className="text-neutral-800 font-normal">
        <span className="font-bold">Frete:</span> {shipping?.shippingInfo}
      </p>
    </div>
  );
}
