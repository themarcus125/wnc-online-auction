import UserService from '@/user/user.service';

export const seedDB = async () => {
  try {
    await UserService.createSA();
  } catch (e) {
    console.log('[MG] Seed failed', e);
  }
};
