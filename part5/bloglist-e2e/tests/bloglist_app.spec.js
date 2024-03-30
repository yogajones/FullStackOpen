const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test Person',
        username: 'teepee',
        password: 'restful'
      }
    })
    await page.goto('/')
  })

  test('login form is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Log in to BlogList App' })).toBeVisible()
    
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()

    await expect(page.getByText('password')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()

    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'teepee', 'restful')
      await expect(page.getByText('Logged in as teepee')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'All blogs' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'teepee', 'restless')
      await expect(page.getByText('Logged in as teepee')).not.toBeVisible()
      await expect(page.getByRole('heading', { name: 'All blogs' })).not.toBeVisible()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'teepee', 'restful')
      await expect(page.getByText('Logged in as teepee')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'All blogs' })).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'TestTitle', 'TestAuthor', 'TestUrl')
      await expect(page.getByText('Succesfully added TestTitle by TestAuthor')).toBeVisible()
      await expect(page.getByText('viewTestTitle (TestAuthor)')).toBeVisible()
    })
    test('an existing blog can be liked', async ({ page }) => {
      await createBlog(page, 'TestTitle', 'TestAuthor', 'TestUrl')
      await expect(page.getByText('viewTestTitle (TestAuthor)')).toBeVisible()

      await createBlog(page, 'TestTitle2', 'TestAuthor2', 'TestUrl2')
      const blog2hidden = page.getByText('viewTestTitle2 (TestAuthor2)')
      await expect(blog2hidden).toBeVisible()
      await blog2hidden.getByRole('button', { name: 'view' }).click()

      const blog2detailed = page.getByText('hideTestTitle2 (TestAuthor2)')
      await expect(blog2detailed.getByText('Likes: 0 like')).toBeVisible()
      await expect(blog2detailed.getByText('Added by teepee')).toBeVisible()
      await blog2detailed.getByRole('button', { name: 'like' }).click()
      await expect(blog2detailed.getByText('Likes: 1 like')).toBeVisible()

      await createBlog(page, 'TestTitle3', 'TestAuthor3', 'TestUrl3')
      await expect(page.getByText('viewTestTitle3 (TestAuthor3)')).toBeVisible()
    })
  })
})