'use client';

export default function PaymentStatus() {
  return (
    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 font-medium px-4 py-2 rounded-full">
      <span>Aguardando pagamento</span>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
