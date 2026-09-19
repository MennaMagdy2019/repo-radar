import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchRepoDetails } from '../githubClient/githubClient';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('githubApi', () => {
  it('combines repository metrics with the latest commit date', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({
        id: 1,
        full_name: 'owner/repo',
        stargazers_count: 10,
        open_issues_count: 2,
        pushed_at: '2026-09-01T00:00:00Z',
      }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify([{
        commit: { author: { date: '2026-09-18T00:00:00Z' } },
      }]), { status: 200 })));

    await expect(fetchRepoDetails('owner/repo')).resolves.toMatchObject({
      full_name: 'owner/repo',
      last_commit_date: '2026-09-18T00:00:00Z',
    });
  });

  it('falls back to the repository push date when commit history is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({
        id: 1,
        full_name: 'owner/repo',
        stargazers_count: 10,
        open_issues_count: 2,
        pushed_at: '2026-09-01T00:00:00Z',
      }), { status: 200 }))
      .mockResolvedValueOnce(new Response('{}', { status: 500 })));

    await expect(fetchRepoDetails('owner/repo')).resolves.toMatchObject({
      last_commit_date: '2026-09-01T00:00:00Z',
    });
  });
});