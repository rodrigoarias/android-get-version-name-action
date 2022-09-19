const core = require('@actions/core')
const github = require('@actions/github')
const g2js = require('gradle-to-js/lib/parser');

const main = async (workspace) => {
	const myToken = core.getInput('git-token');
	const octokit = github.getOctokit(myToken);
	const gradlePath = core.getInput('gradle-path');

	const owner = github.context.payload.repository.owner.login
	const repo = github.context.payload.repository.name

	const manifest = await findFile(octokit, owner, repo, versionName);
	const buff = Buffer.from(manifest.content, 'base64');
  const content = buff.toString('ascii');

  g2js.parseText(content).then(function(representation) {
    var version = representation.android.defaultConfig.versionName;
    console.log(`Version name detected: ${version}`);
    core.setOutput("versionName", version);
  });
}

const findFile = async(octo, organization, repo, fileName, branch) => {
	console.log(`owner:${organization} repo:${repo} path:${fileName} ref:${branch}`)

	gitFile = await octo.rest.repos.getContent({
		owner: organization,
		repo: repo,
		path: fileName,
	})
	return gitFile;
}

main()
