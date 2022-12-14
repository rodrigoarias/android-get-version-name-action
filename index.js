const core = require('@actions/core')
const github = require('@actions/github')
const g2js = require('gradle-to-js/lib/parser');

const main = async (workspace) => {
	const myToken = core.getInput('git-token');
	const octokit = github.getOctokit(myToken);
	const gradlePath = core.getInput('gradle-path');

	const owner = github.context.payload.repository.owner.login
	const repo = github.context.payload.repository.name

	const gradle = await findFile(octokit, owner, repo, gradlePath);
	const buff = Buffer.from(gradle.data.content, 'base64');
  const content = buff.toString('ascii');

  g2js.parseText(content).then(function(representation) {
    var version = representation.android.defaultConfig.versionName;
    var versionCode = representation.android.defaultConfig.versionCode;
    console.log(`Version name detected: ${version}`);
    console.log(`Version code detected: ${versionCode}`);
    core.setOutput("versionName", version);
    core.setOutput("versionCode", versionCode);
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
