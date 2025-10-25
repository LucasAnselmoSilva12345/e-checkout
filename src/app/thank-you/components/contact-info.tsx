type ContactInfoProps = {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
};

export function ContactInfo({ customer }: ContactInfoProps) {
  return (
    <div className=" text-neutral-950 font-medium text-sm">
      <h3 className="font-semibold text-base">Informações de contato</h3>
      <p className="text-neutral-800 font-normal">
        {' '}
        <span className="font-bold">Nome:</span> {customer.name}
      </p>
      <p className="text-neutral-800">
        {' '}
        <span className="font-bold">E-mail:</span> {customer.email}
      </p>
      <p className="text-neutral-800">
        {' '}
        <span className="font-bold">Celular / WhatsApp: </span> {customer.phone}
      </p>
    </div>
  );
}
