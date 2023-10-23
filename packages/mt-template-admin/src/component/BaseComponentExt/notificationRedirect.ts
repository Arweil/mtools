import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

interface NotificationRedirectProps extends ArgsProps {
  goFun: () => void;
}

export default function notificationRedirect(params: NotificationRedirectProps): void {
  const key = `${new Date().getTime()}${Math.random().toString().slice(-6)}`;
  const { goFun, ...notificationProps } = params;

  let timer: number | undefined;

  // 清除计时器
  function goToDeskWrapper() {
    if (timer) {
      clearTimeout(timer);
    }

    goFun();
  }

  timer = window.setTimeout(() => {
    notification.close(key);
    goToDeskWrapper();
  }, notificationProps.duration || undefined);

  notification.open({
    key,
    duration: 0,
    ...notificationProps,
    onClick: () => {
      if (notificationProps.onClick) {
        notificationProps.onClick();
      }
      goToDeskWrapper();
    },
  });
}
