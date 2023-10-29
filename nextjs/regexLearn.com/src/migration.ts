import lookie from 'lookie';

const migration = () => {
  if (typeof window === 'undefined') return; // TODO 生产环境 停止

  // Since the (ShortcutSwitch) component has been removed (v2.11.0), the user cannot modify this value.
  // 因此，该值将从用户的 localStorage 中删除。
  lookie.remove('shortcutHidden');

  const isOlderCookie = typeof lookie.get('lastStep') === 'number';

  if (isOlderCookie) {
    lookie.set('lesson.regex101', {
      currentStep: lookie.get('currentStep') || 0,
      lastStep: lookie.get('lastStep') || 0,
    });

    lookie.remove('currentStep');
    lookie.remove('lastStep');
  }

  const isValidCurrentStep = typeof lookie.get('lesson.regex101')?.currentStep === 'number';

  if (!isValidCurrentStep) {
    lookie.set('lesson.regex101', {
      currentStep: 0,
      lastStep: 0,
    });
  }
};

export { migration };
