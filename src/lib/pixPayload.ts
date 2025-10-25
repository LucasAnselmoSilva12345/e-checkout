import crc16 from 'crc/crc16xmodem';

type generatePayloadPIXProps = {
  pixKey: string;
  nome: string;
  cidade: string;
  valor: number;
  mensagem?: string;
};

export function generatePayloadPIX({
  pixKey,
  nome,
  cidade,
  valor,
  mensagem,
}: generatePayloadPIXProps) {
  const formatValue = valor.toFixed(2);

  const payloadSemCRC =
    '000201' +
    '26580014BR.GOV.BCB.PIX' +
    `01${String(pixKey.length).padStart(2, '0')}${pixKey}` +
    '52040000' +
    '5303986' +
    `540${String(formatValue.length).padStart(2, '0')}${formatValue}` +
    '5802BR' +
    `59${String(nome.length).padStart(2, '0')}${nome}` +
    `60${String(cidade.length).padStart(2, '0')}${cidade}` +
    (mensagem
      ? `62${String(mensagem.length + 4).padStart(2, '0')}05${mensagem}`
      : '') +
    '6304';

  const crc = crc16(payloadSemCRC).toString(16).toUpperCase().padStart(4, '0');

  return payloadSemCRC + crc;
}
