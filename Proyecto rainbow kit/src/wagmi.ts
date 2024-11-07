import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  avalancheFuji
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'bf3b500c025163c3b1c92ff9fe7ed48c',
  chains: [avalancheFuji],
  ssr: true,
});