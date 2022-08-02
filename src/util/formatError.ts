export function formatError(message: string): string {
  if (/[\\"]/g.test(message)) {
    return message.replace(/[\\"]/g, '').replace(/[\\{}]/g, '');
  }
  return message;
}
