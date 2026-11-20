"""Construit skill/scenario-contract-lab.skill (archive zip du dossier de la skill).

Usage, depuis le dossier du projet :  python tools/package_skill.py
Lancer d'abord  node tools/build.js  pour synchroniser les références et le moteur.
"""
import pathlib
import zipfile

root = pathlib.Path(__file__).resolve().parent.parent
src = root / "skill" / "scenario-contract-lab"
out = root / "skill" / "scenario-contract-lab.skill"

if not (src / "SKILL.md").exists():
    raise SystemExit(f"SKILL.md introuvable dans {src}")

with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(src.rglob("*")):
        if f.is_file() and "__pycache__" not in f.parts:
            z.write(f, pathlib.Path("scenario-contract-lab") / f.relative_to(src))
print(f"écrit {out.relative_to(root)}")
