# FounderFocus — Design System

**Version:** 1.0  
**Product:** FounderFocus  
**Purpose:** A productivity and business-planning workspace for early-stage founders.

---

## 1. Colors

FounderFocus uses a clean, minimal interface with Indigo as its primary color. The visual system focuses on clarity, readability, and a professional appearance.

| Color | Name | Hex Code | Usage |
|---|---|---|---|
| Primary | Indigo | `#4F46E5` | Primary buttons, progress bars, links and highlights |
| Primary Hover | Dark Indigo | `#4338CA` | Button hover states |
| Secondary | Slate | `#64748B` | Secondary text, descriptions and labels |
| Background | Light Slate | `#F8FAFC` | Main application background |
| Surface | White | `#FFFFFF` | Cards, forms and content panels |
| Text | Dark Slate | `#1E293B` | Main headings and body text |
| Sidebar | Deep Slate | `#1E293B` | Sidebar background |
| Sidebar Hover | Slate | `#334155` | Sidebar navigation hover |
| Border | Light Gray | `#E2E8F0` | Card borders, input borders and dividers |
| Accent | Light Indigo | `#EEF2FF` | Highlighted sections and secondary visual elements |
| Success | Green | `#15803D` | Completed tasks and successful states |
| Success Background | Light Green | `#DCFCE7` | Success badges |
| Warning | Amber | `#B45309` | Pending tasks and warnings |
| Warning Background | Light Amber | `#FEF3C7` | Pending status badges |
| Error | Red | `#BE123C` | Delete actions and error states |
| Error Background | Light Red | `#FFF1F2` | Error messages and destructive actions |

### Color Usage Guidelines

- Indigo is reserved for primary actions and important highlights.
- Slate shades provide readable text and navigation.
- White surfaces separate content from the background.
- Green represents completed or successful actions.
- Amber represents pending or attention-required states.
- Red is used for errors and destructive actions.

---

## 2. Typography

FounderFocus uses a clean sans-serif typography system to maintain readability across dashboards, forms, task cards, and business goal sections.

**Font Family:** Arial, Helvetica, sans-serif.

| Element | Font Size | Weight | Usage |
|---|---|---|---|
| H1 | 28–32px | Bold (700) | Main page titles |
| H2 | 20–24px | Semi-bold (600) | Section headings |
| H3 | 16px | Semi-bold (600) | Card titles and subsections |
| Body Text | 14–16px | Regular (400) | Descriptions and general content |
| Button Text | 14px | Medium (500) | Primary and secondary actions |
| Small Text | 12–13px | Regular (400) | Metadata, dates and labels |
| Highlighted Text | 13–14px | Semi-bold (600) | Important values and statistics |

### Typography Guidelines

- Use clear and descriptive headings.
- Maintain consistent font sizes throughout the application.
- Use muted Slate colors for secondary information.
- Use bold text to emphasize important values.
- Avoid unnecessary decorative fonts.

---

## 3. UI Components

FounderFocus uses reusable UI components to maintain consistency across different pages.

### Core Components

| Component | Purpose |
|---|---|
| Sidebar | Main navigation between application sections |
| Button | Primary, secondary and destructive actions |
| Card | Displays tasks, goals and dashboard statistics |
| Input | Collects text and date information |
| Textarea | Collects longer descriptions and reflections |
| Dropdown | Selects priority, status and linked business goals |
| Badge | Displays task status and priority |
| Progress Bar | Displays task and business goal completion |
| Empty State | Provides guidance when no data is available |
| Form | Handles task and business goal creation and editing |
| Task Card | Displays task information and associated metadata |
| Goal Card | Displays business goals, target dates and progress |
| Stat Card | Displays dashboard metrics and summaries |
| Modal / Confirmation Dialog | Handles important confirmation actions |
| Loading State | Communicates when content is being loaded |

### Component Styling Guidelines

**Buttons**
- Primary buttons use Indigo (`#4F46E5`).
- Hover states use Dark Indigo (`#4338CA`).
- Destructive actions use Red shades.
- Buttons have rounded corners and clear labels.

**Cards**
- White background.
- Light Gray border.
- Rounded corners (10–15px).
- Consistent internal spacing.
- Subtle shadows where appropriate.

**Forms**
- Clearly visible labels.
- Consistent input heights and spacing.
- Rounded input borders.
- Indigo focus states.
- Clear validation feedback.

**Badges**
- Green for completed.
- Amber for pending.
- Indigo or blue for active states.
- Red for errors.

**Progress Bars**
- Light gray track.
- Indigo progress indicator.
- Rounded edges.
- Percentage displayed clearly.

**Empty States**
- Simple icons or visual indicators.
- Short explanatory messages.
- Clear next action where applicable.

---

## 4. Layout and Spacing

FounderFocus follows a dashboard-based layout with a persistent sidebar and a flexible main content area.

### Layout Guidelines

- Sidebar width: approximately 240px on desktop.
- Main content expands to fill the remaining available space.
- Dashboard cards use CSS Grid.
- Forms and content panels use consistent spacing.
- Content should remain readable without horizontal scrolling.

### Spacing Scale

| Size | Value | Usage |
|---|---|---|
| XS | 4px | Small gaps |
| SM | 8px | Compact spacing |
| MD | 16px | Standard component spacing |
| LG | 24px | Card and section spacing |
| XL | 32px | Major section spacing |
| XXL | 40px | Page-level spacing |

### Responsive Design

- Desktop: Sidebar navigation with multi-column dashboard layouts.
- Tablet: Reduced spacing and fewer columns.
- Mobile: Sidebar navigation changes to a compact navigation layout, and cards and forms stack vertically.

---

## 5. Design Principles

FounderFocus follows these principles:

1. **Simplicity:** Keep the interface clean and avoid unnecessary visual elements.
2. **Clarity:** Important information such as priorities, deadlines and progress should be easy to understand.
3. **Consistency:** Reuse the same colors, typography, spacing and component styles across pages.
4. **Action-Oriented Design:** Make important actions easy to identify and access.
5. **Responsiveness:** Ensure the application works across desktop, tablet and mobile screens.
6. **Meaningful Feedback:** Clearly communicate completed, pending, overdue and error states.

---

## 6. Application Pages

The design system is applied across the following FounderFocus sections:

| Page | Main UI Elements |
|---|---|
| Dashboard | Statistics, priority cards, upcoming tasks and quick actions |
| My Tasks | Task cards, task forms, filters, status badges and postponement information |
| Business Goals | Goal cards, progress bars, target dates and goal creation form |
| Priorities | Ranked priority cards and prioritization explanations |
| Progress | Weekly statistics, completion indicators and task summaries |

---

## 7. Design System Maintenance

- New components should follow the existing color and typography standards.
- Shared styles should be maintained centrally in `globals.css`.
- Reusable React components should be preferred over duplicated UI code.
- Any future changes to the visual system should be reflected in this document.

**End of Design System — FounderFocus v1.0**