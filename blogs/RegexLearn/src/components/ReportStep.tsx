import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import Icon from 'src/components/Icon';

import packageInfo from 'package.json';

interface Props {
  title?: string;
  step: number;
}

const ReportStep = ({ title: stepTitle, step }: Props) => {
  const { query } = useRouter();
  const { lang } = query;

  const title = encodeURI('[Learn]: Type the title here...');
  const body = encodeURI(`
    **Step Number:** \`${step}\`
    **Step Name:** \`${stepTitle}\`
    **Language:** \`${lang}\`
    **Version:** \`v${packageInfo.version}\`

    **User Agent:** 
    \`${window.navigator.userAgent.replace(/;/g, ',')}\`

    ---

    **What is the problem you are experiencing?**
  `);

  return (
    <div className="cursor-default absolute -bottom-6 left-1 select-none">
      <a
        className="inline-flex items-center text-[10px] text-neutral-500 hover:text-green-400"
        href={`https://github.com/aykutkardas/regexlearn.com/issues/new?title=${title}&body=${body}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icon icon="bug" size={14} className="mr-1" />
        <FormattedMessage id="general.reportStep" />
      </a>
    </div>
  );
};

export default ReportStep;
