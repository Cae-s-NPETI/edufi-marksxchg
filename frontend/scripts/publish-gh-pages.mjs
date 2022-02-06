import { publish } from 'gh-pages';

// https://javascript.plainenglish.io/sveltekit-github-pages-4fe2844773de
publish(
    'build-gh', // path to output directory
    {
        branch: 'gh-pages',
        repo: process.env.GIT_REPO,
        dotfiles: true,
    },
    (err) => {
        if (err) {
            console.error('got error:', err);
            process.exit(1);
        }
        console.log('Deploy Complete!');
    }
);
