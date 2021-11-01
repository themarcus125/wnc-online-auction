import { BidDoc } from '@/bid/bid.schema';
import { ProductDoc } from '@/product/product.schema';
import { getIO } from './socket.io';
import { CustomEvent } from './socket.io';

export const ioEmitter = (
  event: CustomEvent,
  payload: any,
  cb?: (err: Error | null, payload: any) => void,
) => {
  const io = getIO();
  if (!io) return null;
  if (cb) return io.emit(event, payload, cb);
  return io.emit(event, payload);
};

export const placedBidEmitter = (
  payload: {
    bid: BidDoc;
    autoBid: BidDoc | null;
    product: ProductDoc;
    holdThePrice: boolean;
  },
  isBuyNow: boolean = false,
) => {
  return ioEmitter(CustomEvent.PLACED_BID, { ...payload, isBuyNow });
};

export const rejectedBidEmitter = (payload: {
  bid: BidDoc;
  product: ProductDoc;
}) => {
  return ioEmitter(CustomEvent.REJECTED_BID, payload);
};
