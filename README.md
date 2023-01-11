# Serverless Wallet Generator

This repository create a ios wallet passes
[Guide](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/index.html#//apple_ref/doc/uid/TP40012195-CH1-SW1) to create your first wallet.

## Usage

### Install dependencies

Run `yarn` on your terminal, to install all dependencies.

### Local development

You can deploy your function locally by using the following command:

```bash
serverless offline
```

## General directory structure

- `certificates`: In this folder yo need add 3 certificates, to create those can follow this [guide](https://github.com/alexandercerutti/passkit-generator/wiki/Generating-Certificates#generate-certificates-through-terminal).
  - signerCert.pem
  - signerKey.pem
  - WWDR.pem
- `models`: contains a folder of assets need for the wallet, [here](https://developer.apple.com/services-account/download?path=/iOS/Wallet_Support_Materials/WalletCompanionFiles.zip) you can download a examples of this assets.
