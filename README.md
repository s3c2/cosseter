# Cosseter: Security Policy Analysis Tool for GitHub Actions Workflows

<!-- [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.PLACEHOLDER.svg)](https://doi.org/10.5281/zenodo.PLACEHOLDER) -->

Cosseter is a comprehensive security analysis tool designed to automatically extract and analyze permissions in GitHub Actions workflows. It performs static analysis on both JavaScript Actions and Bash steps to identify permissions and reduce vulnerabilities in CI/CD pipelines.

## 🚀 Open Source Initiative

This project is available thanks to the **Secure Software Supply Chain Center (S3C2)** and the research institution of **North Carolina State University (NCSU)**. 

### Dataset Availability

Our complete datasets used in this research are available on Zenodo:
- **Full Workflow Dataset**: [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17344798.svg)](https://doi.org/10.5281/zenodo.17344798)
- **Full Action Analysis Results**: [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17344742.svg)](https://doi.org/10.5281/zenodo.17344742)
- **Permission Comparison Data**: 
    - JSON Format (all): [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17344769.svg)](https://doi.org/10.5281/zenodo.17344769)
    - Subet Visual Comparison: [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17341657.svg)](https://doi.org/10.5281/zenodo.17341657)

## 📖 Overview

Cosseter performs multi-layered security analysis of GitHub Actions workflows through:

1. **JavaScript Action Analysis**: Static analysis of third-party JavaScript actions to extract API calls and permission requirements
2. **Bash Script Analysis**: Analysis of shell commands within workflow steps to identify more permission requirements
3. **Permission Extraction**: Automated extraction and classification of security-critical permissions
4. **Workflow Enhancement**: Generation of enhanced workflows with detailed permission annotations

## 🏗️ Architecture

The tool consists of several interconnected components:

### Core Components

- **ActionAnalyzer/**: JavaScript action analysis engine with Celery-based distributed processing
- **BashAnalyzer/**: Bash script and shell command analysis using Semgrep rules
- **PermissionEvaluation/**: Permission extraction and classification system
- **WorkflowFrontend/**: Workflow processing and WIR generation

### Supporting Infrastructure

- **MongoDB**: Stores workflow metadata, analysis results, and extracted permissions
- **Redis**: Message queue for distributed task processing
- **Celery**: Distributed task queue for scalable analysis processing

## 🛠️ Installation & Setup

### Prerequisites

- Docker and Docker Compose
- Python 3.12+
- 20GB - 30GB RAM (200GB+ recommended for large-scale analysis)
- Time (Action analysis can take upwards of 2 hours for **each** action and unique version)

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/s3c2/cosseter.git
   ```

2. **Install python dependencies**
    ```bash
    ./install.sh
    ```

3. **Enter the artifact directory**:
   ```bash
   cd artifact
   ```

4. **Start the infrastructure**:
   ```bash
   docker compose up --build
   ```

5. **Run the analysis tool**:
   ```bash
   python3 runTool.py
   ```

## 🔍 Usage

### Running Analysis

The main entry point is `runTool.py`, which orchestrates the complete analysis pipeline:

```bash
python3 runTool.py
```

The tool will:
1. Present available test workflow sets from `workflowInputs/`
2. Process workflows through the analysis pipeline
3. Store intermediate analysis results for JavaScript actions in MongoDB and Bash steps in JSON files 
4. Generate enhanced workflows with permission annotations

### Available Test Sets

- **motivatingTest/**: Demonstrates the core functionality with a representative workflow
- **basicTest/**: Simple workflow for testing basic functionality
- **complexBashTest/**: Complex Bash script analysis scenarios
- **missingCoverageTest/**: Edge cases and coverage testing

### Analysis Pipeline

1. **Workflow IR Population**: Parses and stores workflow metadata
2. **JavaScript Action Analysis**: Analyzes custom actions using Celery workers
3. **Permission Extraction**: Extracts and classifies permissions from actions
4. **Bash Analysis**: Analyzes shell scripts using Semgrep rules
5. **Permission Evaluation**: Correlates and evaluates all extracted permissions
6. **Enhanced Workflow Generation**: Creates annotated workflows with permission data

## 📊 Output

Results are stored in multiple formats:

- **MongoDB Collections**: Structured analysis results and metadata
- **Enhanced Workflows**: Workflow YAMLs with permission annotations in `updatedWorkflows/`

## 📁 Project Structure

```
artifact/
├── runTool.py                 # Main analysis orchestrator
├── compose.yaml               # Docker orchestration
│
├── ActionAnalyzer/            # JavaScript action analysis
│   ├── celeryApp/            # Distributed processing
│   ├── CosseterJavaScript/   # JS analysis engine
│   └── permissionExtraction/ # Permission extraction
│
├── BashAnalyzer/             # Bash script analysis
│   ├── permExtract/         # Permission extraction for Bash
│   └── semRulesFinal.yaml   # Semgrep analysis rules
│
├── PermissionEvaluation/     # Permission correlation & evaluation
├── WorkflowFrontend/         # WIR generator
├── outputWorkflows/          # Enhanced workflow generation
│
├── workflowInputs/           # Test workflow datasets
├── updatedWorkflows/         # Generated enhanced workflows
└── sharedDirectory/          # Shared data between components
```

## 📝 Research & Citation

This tool was developed as part of security research on CI/CD pipelines. If you use Cosseter in your research, please cite our work:

```bibtex
@INPROCEEDINGS{cosseter,
  author={Greg Tystahl and Jonah Ghebremichael and Siddharth Muralee and Sourag Cherupattamoolayil† and Antonio Bianchi and Aravind Machiry and Alexandros Kapravelos and William Enck},
  booktitle={2026 IEEE Symposium on Security and Privacy (SP)}, 
  title={COSSETER: GitHub Actions Permission Reduction Using Demand-Driven Static Analysis}, 
  year={2026},
  volume={},
  number={},
  pages={???-???},
  doi={???}
}
```

## 🤝 Contributing

We welcome contributions! Please see our contribution guidelines:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed descriptions of changes

## 📜 License

This project is licensed under GPL v2

## 🛠️ Major Integrated and or Modified Dependencies
* **ARGUS**: [Paper](https://www.usenix.org/system/files/usenixsecurity23-muralee.pdf)|[Repo](https://github.com/purs3lab/Argus)
    - Modified to produce custom WIRs for workflow ingestion
* **ODGen-Fast**: [Paper](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10179352&casa_token=IeEHsUfHBycAAAAA:GpPhhSv2e0TlVUN2F9IsEm2N_Yh-4t1ZDIarBtWBLmv0huIYTa_Xu7YW_PmMyaWKaGkehQpc)|[Repo](https://github.com/fast-sp-2023/fast/tree/main?tab=readme-ov-file)
    - Implemented our Demand-Driven JavaScript analysis on top of the static analysis base provided
    - Improved upon general analysis and added support for handling packed JavaScript
* **Semgrep**: [Repo](https://github.com/semgrep/semgrep)
    - We created custom Semgrep rules and used them to perform the Bash analysis

## 🆘 Support & Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**: Ensure MongoDB is running and accessible on port 27017
2. **Memory Issues**: Increase Docker memory limits in `compose.yaml`
3. **Celery Worker Issues**: Check Redis connectivity and worker logs

### Getting Help

- Open an issue on GitHub for bug reports
- Contact the research team at S3C2 and North Carolina State University for research collaborations
- Check the documentation in individual component directories
