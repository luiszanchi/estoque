import { User } from "../../user/user.model";
import * as bcrypt from 'bcrypt';

export const createUserJest = async (): Promise<User> => {
    const password = await bcrypt.hash('admin', 10);
    return await User.create({
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'admin@admin.com',
      password,
      type: 'A'
    });
}