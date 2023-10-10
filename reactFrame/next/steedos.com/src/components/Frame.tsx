// @flow
import * as React from "react";
import styled from "styled-components";



// This wrapper allows us to pass non-standard HTML attributes through to the DOM element
// https://www.styled-components.com/docs/basics#passed-props
class Iframe extends React.Component<any> {
  container;
  state = { contentHeight: 100 };

  handleResize = () => {
    const { body, documentElement } = this.container.contentWindow.document;
    const contentHeight = Math.max(
      body.clientHeight,
      body.offsetHeight,
      body.scrollHeight,
      // documentElement.clientHeight,
      // documentElement.offsetHeight,
      // documentElement.scrollHeight
    );
    if (contentHeight > 0)
      if (contentHeight !== this.state.contentHeight) this.setState({ contentHeight });
  };
  
  onLoad = () => {
    this.container.contentWindow.addEventListener('resize', this.handleResize);
    // window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  
  componentWillUnmount() {
    this.container.contentWindow.removeEventListener('resize', this.handleResize);
    // window.removeEventListener('resize', this.handleResize);
  }
  
  render() {
    const { contentHeight } = this.state;
    return (
      <iframe
        {...this.props} 
        frameBorder="0"
        onLoad={this.onLoad}
        ref={(container) => { this.container = container; }}
        scrolling="no"
        // style={{ width: '100%', height: `${contentHeight}px` }}
        title="EmbedAuthSize"
      />
    );
  }
}

type Props = {
  src?: string,
  border?: boolean,
  title?: string,
  icon?: any,
  canonicalUrl?: string,
  isSelected?: boolean,
  width?: string,
  height?: string,
  forwardedRef: any,
  className?: any,
  theme?:any
};

class Frame extends React.Component<Props> {
  forwardedRef: any;

  render() {
    const {
      border,
      width = "100%",
      forwardedRef,
      icon,
      title,
      canonicalUrl,
      isSelected,
      className,
      theme,
      src,
    } = this.props;

    return (
      <div
        className="w-full max-h-[260px] sm:max-h-[380px] md:max-h-[512px] lg:max-h-[512px] xl:max-h-[600px]"
      >
        <Iframe
            ref={forwardedRef}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            width={width}
            // height={height}
            type="text/html"
            frameBorder="0"
            // title="embed"
            loading="lazy"
            src={src}
            className={className}
            allowFullScreen
          />
      </div>
    );
  }
}


const Open: any = styled.a`
  color: ${(props) => props.theme.textSecondary} !important;
  font-size: 13px;
  font-weight: 500;
  align-items: center;
  display: flex;
  position: absolute;
  right: 0;
  padding: 0 8px;
`;

const Title: any = styled.span`
  font-size: 13px;
  font-weight: 500;
  padding-left: 4px;
`;

const Bar: any = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.embedBorder};
  background: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.textSecondary};
  padding: 0 8px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  user-select: none;
`;

const StyledIframe: any = styled(Iframe)`
  border-radius: ${(props) => (props.$withBar ? "3px 3px 0 0" : "3px")};
  display: block;
`;

export default React.forwardRef<Props, typeof Frame>((props, ref) => (
  <Frame {...props} forwardedRef={ref} />
));
