import { Job, scheduleJob, rescheduleJob } from 'node-schedule';
import BidService from '@/bid/bid.service';
import { sendMail } from '@/mail/mail.service';
import ProductService from '@/product/product.service';
import { UserDoc } from '@/user/user.schema';
import { tag } from '@/utils/html';
import { ProductDoc } from '@/product/product.schema';
import UserService from '@/user/user.service';

class Scheduler {
  jobs: Map<String, Job>;
  isReady: boolean;
  constructor() {
    this.jobs = new Map();
    this.isReady = false;
  }
  init(products: ProductDoc[]) {
    products.forEach((product) => {
      const { _id, expiredAt } = product;
      const job = scheduleJob(new Date(expiredAt), this.mailJobHandler(_id));
      this.jobs.set(_id, job);
    });
    this.isReady = true;
  }

  getJob(productId: string) {
    if (!this.isReady) return null;
    return this.jobs.get(productId) || null;
  }

  reschedule(productId: string, date: Date) {
    if (!this.isReady) return null;
    const job = this.getJob(productId);
    if (!job) return false;
    return rescheduleJob(job, date);
  }

  addMailJob(productId: string, date: Date) {
    if (!this.isReady) return null;
    if (this.jobs.has(productId)) {
      this.reschedule(productId, date);
      return null;
    }
    const job = scheduleJob(date, this.mailJobHandler(productId));
    this.jobs.set(productId, job);
    return job;
  }

  mailJobHandler(productId: string) {
    return async () => {
      try {
        this.jobs.delete(productId);
        const product = await ProductService.findById(productId);
        if (!product) return null;
        const winner = await UserService.findById(product.currentBidder);
        if (winner) {
          this.sendScheduleMailWinner(winner.email, product);
        }
        const seller = await UserService.findById(product.seller);
        if (seller) {
          this.sendScheduleMailSeller(seller.email, product);
        }
        return null;
      } catch (e) {
        return null;
      }
    };
  }

  async sendScheduleMailWinner(
    email: string,
    { name, _id, currentPrice }: ProductDoc,
  ) {
    return sendMail(
      [email],
      'Your bid have won',
      tag(
        'div',
        tag(
          'p',
          `${`You have won the ${name} - ${_id} with price is ${currentPrice}`}`,
        ) + tag('p', 'Remember to contact the seller for trading'),
      ),
    );
  }

  async sendScheduleMailSeller(email: string, { name, _id }: ProductDoc) {
    return sendMail(
      [email],
      'Your product has been expired',
      tag('div', tag('p', `Your product ${name} - ${_id} has been expired`)),
    );
  }
}

const ScheduleService = new Scheduler();
export const setupSchedule = async () => {
  const products = await ProductService.findNotExpired();
  ScheduleService.init(products);
  return ScheduleService;
};
export default ScheduleService;
