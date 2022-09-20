# android-get-version-name-action
Gets Android Version Name from build.gradle file.
This is a simple and small action usefull for getting the current android version name without depending of gradle commands.
For now it only works when the versionName and versionCode is explictly in the default android gradle structure:
```
android {
	defaultConfig {
		versionName "1.0.0"
	}
}
```

## Inputs

## `git-token`

**Required** A GITHUB_SECRET with enough permissions to add a file.

## `gradle-path`

The path of the build.gradle file with the versionName. Default: `"app/build.gradle"`.

## Outputs

## `versionName`

The Android app version name

## `versionCode`

The Android app version code

## Example usage
```
    # Get Name
    - name: Get Name
      id: version
      uses: rodrigoarias/android-get-version-name-action@v1.0.0
      with:
        git-token: ${{ secrets.RELEASE_GITHUB_KEY }}
    
    # create dir 
    - name: Print version
      run: echo "The version is ${{ steps.version.outputs.versionName }}"
      
```
