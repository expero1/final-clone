import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentProductIsLoading } from '../../redux/selectors';
import {
  StyledRouterLink,
  StyledBreadcrumbs,
  StyledSpan,
} from '../../themes/themeBreadcrumbs';

export default function BreadCrumbs() {
  const location = useLocation();
  const params = useParams();
  const product = useSelector((state) => state.product.product);
  const isLoading = useSelector(currentProductIsLoading);
  const path = location.pathname.split('/').filter((crumb) => crumb);
  const crumbs = [];
  let crumbPath = '';
  const [showSeparator, setShowSeparator] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSeparator(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const separator = showSeparator ? '>' : '/';
  if (location.pathname !== '/') {
    crumbs.push(
      <StyledRouterLink key="home" color="inherit" to="/">
        Home
      </StyledRouterLink>
    );
  }

  path.forEach((crumb, index) => {
    if (crumb) {
      crumbPath += `/${crumb}`;

      const isCurrentPage = location.pathname === crumbPath;
      const isLastCrumb = index === path.length - 1;

      if (isLastCrumb) {
        if (params.id && product) {
          if (isLoading) {
            crumbs.push(
              <StyledSpan key="paramsId" className="loading">
                . . . . . . . . . . .
              </StyledSpan>
            );
          } else {
            crumbs.push(<StyledSpan key="paramsId">{product.name}</StyledSpan>);
          }
        } else {
          const capitalizedStr = crumb.charAt(0).toUpperCase() + crumb.slice(1);
          crumbs.push(
            <StyledSpan key={crumbPath}>{capitalizedStr}</StyledSpan>
          );
        }
      } else if (!isCurrentPage) {
        const capitalizedStr = crumb.charAt(0).toUpperCase() + crumb.slice(1);
        crumbs.push(
          <StyledRouterLink key={crumbPath} color="inherit" to={crumbPath}>
            {capitalizedStr}
          </StyledRouterLink>
        );
      }
    }
  });

  if (
    crumbs.length === 0 ||
    location.pathname === '/login' ||
    location.pathname === '/registration'
  ) {
    return null;
  }

  return (
    <StyledBreadcrumbs separator={separator} aria-label="breadcrumb">
      {crumbs}
    </StyledBreadcrumbs>
  );
}
