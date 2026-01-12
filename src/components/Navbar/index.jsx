// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import useTheme from '../../hooks/useTheme';
import styles from './Navbar.module.css';
import { Sun, Moon }    from 'phosphor-react';

export default function Navbar({ pages }) {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname || '/');
  }, []);

  function normalisePath(path) {
    if (!path) return '/';
    if (path === '/') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  const isActive = (href) => {
    const current = normalisePath(currentPath);
    const target = normalisePath(href);
    if (target === '/') return current === '/';
    return current === target || current.startsWith(`${target}/`);
  };

  const handleClickOutside = useCallback((e) => {
    if (
      navRef.current &&
      !navRef.current.contains(e.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, handleClickOutside]);

  // Clone and sort pages by slug
  const sortedPages = [...pages].sort((a, b) =>
    a.slug.localeCompare(b.slug)
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Brand */}
        <a href="/" className={styles.brand}>
          <span className={styles.brandText} aria-label="WikiAstro">
            WikiAstro
          </span>
        </a>

        {/* Theme toggle */}
        <button
          className={styles.toggleButton}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <Moon size={24} weight="bold" className={styles.iconLight} />
          <Sun  size={24} weight="bold" className={styles.iconDark} />
        </button>

        {/* Mobile menu toggle (burger → X) */}
        <button
          ref={toggleRef}
          className={`${styles.toggle} ${open ? styles.open : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation links */}
        <ul
          ref={navRef}
          className={`${styles.navList} ${open ? styles.open : ''}`}
        >
          {sortedPages.map(page => {
            // Also sort any children
            const sortedChildren = page.children
              ? [...page.children].sort((a, b) =>
                  a.slug.localeCompare(b.slug)
                )
              : [];

            return (
              <li key={page.slug} className={styles.navItemWrapper}>
                <a
                  href={`/${page.slug}`}
                  className={`${styles.navItem} ${
                    page.children?.length ? styles.hasChildren : ''
                  } ${isActive(`/${page.slug}`) ? styles.active : ''}`}
                  aria-current={isActive(`/${page.slug}`) ? 'page' : undefined}
                >
                  {page.title}
                </a>
                {sortedChildren.length > 0 && (
                  <ul className={styles.dropdown}>
                    {sortedChildren.map(child => (
                      <li key={child.slug}>
                        <a
                          href={`/${child.slug}`}
                          className={`${styles.navItem} ${isActive(`/${child.slug}`) ? styles.active : ''}`}
                          aria-current={isActive(`/${child.slug}`) ? 'page' : undefined}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}

          <li className={styles.navItemWrapper}>
            <a
              href="/library"
              className={`${styles.navItem} ${isActive('/library') ? styles.active : ''}`}
              aria-current={isActive('/library') ? 'page' : undefined}
            >
              The Library
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
