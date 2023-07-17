export type Message = {
  category: 'Item data',
  message: string,
  status: 'busy' | 'failed' | 'success';
}
