# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static personal portfolio website with no build system or dependencies. Open `index.html` directly in a browser to preview. Changes are immediately reflected on reload.

## Architecture

Single-page application with three files:

- **`index.html`** — All content and markup. Sections in order: About (banner hero), Testimonials, Skills, Projects, Experience, Contact.
- **`styles.css`** — CSS custom properties at `:root` drive the color theme (`--primary`, `--secondary`, `--accent`, `--light`, `--dark`). Responsive breakpoint at `768px`.
- **`script.js`** — Vanilla JS initialized in a single `DOMContentLoaded` listener. Contains: typewriter effect, mobile hamburger menu, scroll-based nav highlighting, scroll reveal animations, banner collapse on scroll, and testimonial carousel with auto-rotation and dot navigation.

External dependencies loaded via CDN only:
- Font Awesome (`kit.fontawesome.com`) for icons

## Key Patterns

- To add a new testimonial: add a `.testimonial` div in `index.html` and a corresponding `.dot` span in `.testimonial-dots`. The JS carousel reads these dynamically by count.
- To add a new experience entry: add a `.timeline-item` div with `.timeline-date` and `.timeline-content` children.
- Accent color (`#06b6d4` cyan) is used as the brand color throughout — change `--accent` in `:root` to retheme.
- The `#about` section uses `assets/banner-image.jpeg` as a CSS `background-image` with a dark overlay (`.banner-overlay`) for text readability.
