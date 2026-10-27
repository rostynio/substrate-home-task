import { expect, test } from '@playwright/test'

test('buyer moves between Dashboard, Active loans, and My applications', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByText('2022 Bobcat T76')).toBeVisible()
  await expect(page.getByText('2021 CAT 259D')).toBeVisible()
  await expect(page.getByText('2024 Takeuchi TB240')).toBeVisible()

  await page.getByRole('navigation', { name: 'Account' }).getByRole('link', { name: 'Active loans' }).click()
  await expect(page.getByRole('heading', { name: 'Active loans' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '2022 Bobcat T76' })).toBeVisible()

  await page.getByRole('navigation', { name: 'Account' }).getByRole('link', { name: 'My applications' }).click()
  await expect(page.getByRole('heading', { name: 'Your applications' })).toBeVisible()
})

test('buyer opens a funded application as that loan', async ({ page }) => {
  await page.goto('/applications')
  const bobcat = page.getByRole('article').filter({ hasText: '2022 Bobcat T76' })
  await bobcat.getByRole('link', { name: 'View loan' }).click()
  await expect(page.getByRole('heading', { name: '2022 Bobcat T76' })).toBeVisible()
  await expect(page.getByText('Paid', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('Expected', { exact: true }).first()).toBeVisible()
})

test('buyer opens a blocked application and reads why it is stuck', async ({ page }) => {
  await page.goto('/applications')
  const deere = page.getByRole('article').filter({ hasText: '2025 John Deere 350G' })
  await deere.getByRole('link', { name: 'See app' }).click()
  await expect(page.getByText('Garage owes us the equipment invoice')).toBeVisible()
})

test('payoff on the last posted debit adds no interest', async ({ page }) => {
  await page.goto('/loans/bobcat-t76')
  const quote = page.getByRole('region', { name: 'Payoff quote' })
  await expect(quote.getByText('This is an estimate, not a payoff letter.')).toBeVisible()
  await expect(quote.getByText(/Includes .+ of interest/)).toBeVisible()

  await quote.getByLabel('As of').fill('2026-10-15')
  await expect(quote.getByText(/No additional interest/)).toBeVisible()
  await expect(page.getByRole('button', { name: /^(pay|make a payment)$/i })).toHaveCount(0)
})
