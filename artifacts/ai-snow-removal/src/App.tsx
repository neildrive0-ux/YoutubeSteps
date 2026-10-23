import { type ReactNode, useEffect, useRef } from 'react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import HomePage from '@/pages/home';
import SeasonalContractsPage from '@/pages/seasonal-contracts';
import SnowRemovalPricesPage from '@/pages/snow-removal-prices';
import DrivewaySnowRemovalPage from '@/pages/driveway-snow-removal';
import SnowRemovalForSeniorsPage from '@/pages/snow-removal-for-seniors';
import ThankYouPage from '@/pages/thank-you';
import SnowRemovalQuotePage from '@/pages/snow-removal-quote';
import LandscapingQuotePage from '@/pages/landscaping-quote';
import SnowAndIceManagementPage from '@/pages/snow-and-ice-management';
import LandscapeManagementPage from '@/pages/landscape-management';
import LandscapeEnhancementsPage from '@/pages/landscape-enhancements';
import { PrivacyPolicy } from '@/pages/privacy-policy';
import NotFound from '@/pages/not-found';
import { trackPageView } from '@/lib/tracking';

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/snow-removal-quote" component={SnowRemovalQuotePage} />
        <Route path="/landscaping-quote" component={LandscapingQuotePage} />
        <Route path="/snow-and-ice-management" component={SnowAndIceManagementPage} />
        <Route path="/landscape-management" component={LandscapeManagementPage} />
        <Route path="/landscape-enhancements" component={LandscapeEnhancementsPage} />
        <Route path="/seasonal-snow-removal-contracts" component={SeasonalContractsPage} />
        <Route path="/snow-removal-prices" component={SnowRemovalPricesPage} />
        <Route path="/driveway-snow-removal" component={DrivewaySnowRemovalPage} />
        <Route path="/snow-removal-for-seniors" component={SnowRemovalForSeniorsPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/thank-you" component={ThankYouPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    trackPageView(location);
  }, [location]);

  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')} ssrPath={ssrPath}>
      <Router />
    </WouterRouter>
  );
}

export default App;
