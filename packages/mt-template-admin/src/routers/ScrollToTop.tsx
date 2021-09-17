import { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface ScrollToTopProps extends RouteComponentProps {
  selectors?: string;
}

class ScrollToTop extends PureComponent<ScrollToTopProps> {
  componentDidUpdate(prevProps: ScrollToTopProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);

      const { selectors } = this.props;
      if (selectors) {
        const element = document.querySelector(selectors);
        element && element.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
