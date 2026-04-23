import { expect, test } from "@playwright/test";

test("mobile nav toggle works and layout does not overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggleButton = page.getByRole("button", { name: /toggle menu/i });
  await expect(toggleButton).toBeVisible();

  await toggleButton.click();
  await expect(page.getByRole("link", { name: "Categories" })).toBeVisible();
  await page.getByRole("link", { name: "Categories" }).click();
  await expect(page).toHaveURL(/\/categories$/);

  const hasOverflowOnCategories = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflowOnCategories).toBeFalsy();

  await page.goto("/skills");
  const hasOverflowOnSkills = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflowOnSkills).toBeFalsy();

  await page.getByRole("link", { name: "Open Skill" }).first().click();
  await expect(page).toHaveURL(/\/skills\/[^/]+$/);
  await expect(page.getByRole("heading", { name: "Example runs" })).toBeVisible();

  const hasOverflowOnSkillDetail = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflowOnSkillDetail).toBeFalsy();
});
