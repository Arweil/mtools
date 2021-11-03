import { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'malganis/router';

export interface ScrollToTopProps extends RouteComponentProps {
  selectors?: string;
}

class ScrollToTop extends PureComponent<ScrollToTopProps> {
  componentDidUpdate(prevProps: ScrollToTopProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);

      const { selectors } = this.props;
      if (selectors) {
        const element = document.querySelector(selectors);
        element?.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
